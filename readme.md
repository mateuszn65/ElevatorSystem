# Elevator System

## Concept and Design

First I've noticed there are two main problems to solve:

- Decide which elevator to send to a floor when a pickup request is made
- Decide which floor to go to when there are multiple requests from within the elevator

Let's start with the second problem.
There are two basic approaches to this problem:

- First come first serve - This is simple but not efficient in terms of time and energy
- Nearest floor - This is more efficient but when there are multiple requests from within the elevator, the elevator may have to go up and down multiple times to fulfill all the requests. Someone who's floor was second nearest may end up last because the elevator went the other way first to fulfill the first request. This is not efficient in terms of user experience.

Since people can specify the direction they want to go in, before entering the elevator we can modify the second approach by adding a direction factor to it so that the elevator will first fulfill the requests in the same direction as it is currently going and then the requests in the opposite direction.

Now let's look at the first problem.
If we were to assume that the pickup requests are equivalent to requests from within the elevator, then we can use the same approach to solve both problems.

  However, that would allow for a situation where elevator is going down so we can add a pickup request from below to go down, but before it reaches our floor people leave the elevator and someone seeing empty elevator will surely enter it instead of waiting for another one and might want to go the opposite direction. Now from that person's point of view, the elevator is going the wrong way and he/she will spend more time inside the elevator than necessary.

Because of this I think it's better to have a separate system for pickup requests.
If we know that the elevator will pass by our floor on it's way then we can use it for the pickup request in the same direction. Otherwise we have to use one that is not moving. We can prioritize the closest pickup requests. Additionally, we could give a higher priority to requests that have been waiting for a longer time. 