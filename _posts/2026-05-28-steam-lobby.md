---
layout: post
title: "Steam lobby member index issues"
date: 2026-05-28
comments: true
tags: post
---

Recently, I've been implementing a lobby system into my game via the [Steamworks Matchmaking API](https://partner.steamgames.com/doc/features/multiplayer/matchmaking), and I came across a bug that I haven't seen documented so I wanted to share the bug I ran into and the solution I ended up using.

## Out-of-sync indices (The issue)

The bug I was running into had to do with players leaving and rejoining lobbies. In my code, I had everything setup to use the [GetLobbyMemberByIndex](https://partner.steamgames.com/doc/api/ISteamMatchmaking#GetLobbyMemberByIndex) calls, basically relying on the steamworks implementation of player indices to resolve which player should be P1, P2, and so on.. If I had a player create a lobby, it would then become the host and thus be considered the member at index 0 via the steamworks lobby. If a new player joined, then that player would be assigned index 1.

However, when a player left the lobby and rejoined - the indices would become mismatched. Basically, the previous player who became the new host would for some reason remain at index 1 even after the original host left the lobby; but new players joining the lobby would see that player at index 0. This didn't matter much for my actual lobby logic since I was relying on my own logic to detect which player is the host, but it was messing up the player username displays in the lobby since that depends on the member index.

The only discussion I found online was this thread which didn't really go anywhere:  
- [https://discussions.unity.com/t/steamworks-problem-with-getlobbymemberbyindex/774007](https://discussions.unity.com/t/steamworks-problem-with-getlobbymemberbyindex/774007)

## The Problem

So far, I haven't been able to find a definitive answer on why this problem was occuring - which meant I didn't have a "proper" solution for it. The google search AI answer (that I didn't ask for) gave me this:

> In Steamworks, using GetLobbyMemberByIndex is inherently unreliable for identifying specific players because indices dynamically shift as players leave and rejoin. The host and clients may cache desynchronized orderings, creating tracking issues.

Without a better lead on what the root issue is, I had to just kind of take the answer at face value and implement my own fix instead of trying to find an existing solution. I was really hoping there would be some magic API call I could use to synchronize the lobbies, but alas, I was unable to find anything.

## The Solution

My solution in the end was for the host to authoratatively handle player ordering (which player is P1, which player is P2, etc) instead of relying on the lobby member indices to do so. I directly implemented this mechanism using the lobby metadata feature directly built into the steamworks matchmaking API. Basically, when the host creates a lobby, it will write its user ID into the "P0" key in the metadata. Then, when a new user joins the lobby, the host will add the user ID of the new player into the corrsponding metadata key - e.g. a second player joining means its user ID will be written into the metadata with a key of  "P1".

```c++
// My janky C++ interface for setting the lobby data
inline void SendLobbyMemberData(int index, uint64_t id, GamePlatformInterface& platform)
{
    static char buffer[3] = { 'P', '0', '\0' };
    buffer[1] = '0' + index;
    const std::string idString = std::to_string(id);
    platform.SetLobbyData(buffer, idString.c_str());
}
```

This approach ended up scaling nicely for 4 player lobbies as well, since any new users would just be written into whatever player slot the host determines, e.g. "P2" and P3". Since the host handles all the ordering directly, all the clients have to do is simply get the lobby metadata - and they'll automatically be in sync with whatever lobby representation the host has.

```c++
// My even jankier logic to get the lobby data
const char* player1Data = mEngine.GetGamePlatform().GetLobbyData("P0");
if (std::strlen(player1Data) > 0)
{
    mLobbyData.mPlayer1ID = std::stoull(player1Data);
}
```

The biggest edge case I had to handle was when the original host leaves. I want the host to always be player 1 in the lobby, but sometimes the member index represented by steamworks for the new host would remain at 1 - as such, I had to add some extra logic to make sure the host always takes the player 1 slot. The code looks something like this:
```c++
// As the host, always set the player 1 slot to ourselves
CharSelectNetworkUtil::SendLobbyMemberData(0, selfID, mEngine.GetGamePlatform());
const int numLobbyMembers = mEngine.GetGamePlatform().GetNumLobbyMembers();
size_t userIndex = 0;
// Then, just fill out the rest of the player slots according to our own underlying steamworks member index representation
for (size_t i = 1; i < numLobbyMembers; ++i)
{
    uint64_t memberID = mEngine.GetGamePlatform().GetLobbyMember(userIndex);
    if (memberID == selfID)
    {
        userIndex++;
        memberID = mEngine.GetGamePlatform().GetLobbyMember(userIndex);
    }
    CharSelectNetworkUtil::SendLobbyMemberData(i, memberID, mEngine.GetGamePlatform());
}
```

## Conclusion

Honestly, this isn't the hardest bug to identify and fix - the biggest reason I wanted to write up this issue and my solution was because I can't find any other information online so I wanted to document it for others running into the same issue in the future.

I'm still kind of convinced that I'm hallucinating this bug because there's such little record of it despite it occuring in what I'd consider a pretty major mechanism in the lobby system. Maybe I'm just missing something that everyone else already knows..

Obviously, I have to shout out my own game here at the end - it's a brick breaker fighting game with custom rollback netcode. Please check it out!

<iframe src="https://store.steampowered.com/widget/4275860/" frameborder="0" width="646" height="190"></iframe>