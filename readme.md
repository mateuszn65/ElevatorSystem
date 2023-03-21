# Elevator System

## Concept and Design

###### I've identified two main problems to solve in the elevator system:

1. Decide which elevator to send to a floor when a pickup request is made
2. Decide which floor to go to when there are multiple requests from within the elevator

###### Let's start with the second problem.
There are two basic approaches to this problem:

- First come first serve - This is simple but not efficient in terms of time and energy
- Nearest floor - This is more efficient but when there are multiple requests from within the elevator, the elevator may have to go up and down multiple times to fulfill all the requests. Someone who's floor was second nearest may end up last because the elevator went the other way first to fulfill the first request. This is not efficient in terms of user experience.

Since people can specify the direction they want to go in, before entering the elevator we can modify the second approach by adding a direction factor to it so that the elevator will first fulfill the requests in the same direction as it is currently going and then the requests in the opposite direction.


###### Now let's look at the first problem.
I believe that requests from within the elevator should be prioritized over requests from outside the elevator. This is because people inside the elevator are already in the elevator and are more likely to be in a hurry than people who are waiting outside the elevator. So we can add a second queue for pickup requests that is checked after the first queue is empty or when the floor is the same as in the first queue.


## Implementation
I've implemented the solution using JavaScript and created an interactive ***demo*** to test it out. The actual implementation can be found in the `js/Elevator` folder.


## Installation
To open the HTML files, you need to run a local server. I've used the LiveServer Extension for VS Code, but you can use any other server.
For example, you can use `http-server`. The `-g` flag means global, so you can run it from anywhere.
```
npm install http-server -g
```
Then you can run it in the root folder of the project:
```
http-server -o
```
Flag `-o` will open the demo in your browser at `http://localhost:8080/`
