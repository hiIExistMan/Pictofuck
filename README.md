# Pictofuck
an esoteric 2d programming language 
pictofuck is based on the program of brainfuck 
to explain how each color worked we will give them each a name
![alt text](https://github.com/hiIExistMan/Pictofuck/blob/main/tutorialImages/touchpad.png?raw=true)
the top row are the reds and they each just have a number going up 1, 2, 3, and 4
the same for all the other rows with the greens blues and purples
now the reds have incrementing options red 1 will push the data pointer to the right and red 2 will push it to the left
red 3 and 4 will increment or decrement the number at the data pointer
the greens have control jobs 
green 1 will print out the ascii representation of the current piece of data to the console
green 2 will start a bracket what this will do is if the current data is a zero then it will jump to it's matching green 3 bracket
green 3 is mostly the same though it will jump back if the data is nonzero
green 4 will simply halt the program
the blues are all for directions and blue 1 2 3 and 4 will turn the direction to right down up and left
the rest of the colors are there for no reason other than do allow you to make your sadness while writting a program in this language slightly smaller
