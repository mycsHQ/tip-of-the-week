## Euclidean Rhythms

![euclid](https://user-images.githubusercontent.com/381895/44780347-07d07400-ab82-11e8-92a8-d0d50b2d49d0.jpg)

### The Algorithm
Euclid invented an algorithm to find the greatest commond divisor of two numbers.

It might be the first algorithm ever described.

It's based on the observation that the difference of the two numbers and the smaller of the two have the same CGD as the original pair of numbers. The steps of the algorithm involve continuous subtraction of the smaller number from the bigger number, until the remainder is zero or smaller than the smaller number.

See more details [on Wikipedia](https://en.wikipedia.org/wiki/Euclidean_algorithm);

## The Rhythm

Some clever dude named Godfried Toussaint discovered that this CGD algorithm can be used to describe most of the world's musical rhythms. Euclidean rhythms allow for equidistantly distributed accents in any number of beats.

![euclidean-rhythms-e1448056872144](https://user-images.githubusercontent.com/381895/44780471-51b95a00-ab82-11e8-8abe-b24585e85af9.png)

See [Wikipedia](https://en.wikipedia.org/wiki/Euclidean_rhythm).

This can be programmed using the modulo operator in a loop. A software implementation with Arduino [on GitHub](https://github.com/katspaugh/arduino-euclid).

Here's [a short video](https://vimeo.com/286662190) demonstrating the rhythm.
