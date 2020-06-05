/*-----------------------------------------
MAPS
-----------------------------------------*/

/*
0 = border / building
1 = burned bush
2 = empty
3 = bush
4 = well (puit)
8 = koala
9 = occuped
*/

// Level 1
let gameMap1 =
    [[9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
     [0, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
     [0, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
     [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 0],
     [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
     [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
     [0, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
     [0, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 0],
     [0, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1, 0],
     [0, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0],
     [0, 1, 1, 1, 2, 2, 3, 4, 9, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
     [0, 1, 1, 1, 2, 3, 3, 9, 9, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
     [0, 1, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
     [0, 2, 2, 1, 2, 2, 2, 1, 3, 3, 2, 1, 2, 1, 1, 1, 2, 2, 1, 0],
     [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
     [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 1, 1, 1, 1, 0],
     [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 0],
     [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

// Level 2
let gameMap2 =
    [[9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [9, 9, 9, 8, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 0],
     [0, 9, 9, 8, 1, 3, 1, 1, 2, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 0],
     [0, 3, 2, 2, 1, 3, 2, 2, 2, 1, 3, 2, 2, 1, 1, 2, 1, 1, 1, 0],
     [0, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 3, 2, 2, 0],
     [0, 2, 2, 3, 1, 1, 3, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 0],
     [0, 3, 3, 2, 1, 1, 3, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 0],
     [0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 2, 2, 1, 1, 2, 2, 2, 2, 0],
     [0, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0],
     [0, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 0],
     [0, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 0],
     [0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 2, 2, 3, 2, 2, 2, 2, 0],
     [0, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 2, 3, 1, 3, 3, 2, 2, 0],
     [0, 2, 2, 2, 2, 2, 2, 1, 2, 3, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0],
     [0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 8, 1, 3, 0],
     [0, 2, 2, 1, 1, 1, 2, 3, 2, 2, 2, 2, 2, 2, 3, 1, 1, 1, 3, 0],
     [0, 2, 2, 2, 1, 1, 3, 3, 3, 2, 2, 2, 2, 2, 3, 2, 1, 1, 3, 0],
     [0, 2, 2, 4, 9, 1, 1, 1, 3, 3, 2, 2, 2, 2, 2, 2, 1, 3, 3, 0],
     [0, 2, 2, 9, 9, 2, 1, 1, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

// Level 3
let gameMap3 =
    [[9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [9, 9, 9, 1, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0],
     [0, 9, 9, 2, 7, 1, 7, 7, 7, 7, 7, 1, 1, 1, 7, 7, 1, 7, 7, 0],
     [0, 1, 2, 2, 7, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 7, 0],
     [0, 1, 1, 1, 1, 3, 1, 7, 7, 7, 7, 3, 1, 7, 7, 7, 7, 1, 7, 0],
     [0, 7, 7, 7, 1, 1, 1, 3, 7, 7, 7, 7, 1, 7, 3, 1, 1, 1, 3, 0],
     [0, 7, 7, 7, 7, 7, 3, 3, 7, 7, 7, 7, 7, 3, 1, 4, 9, 3, 3, 0],
     [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 1, 9, 9, 1, 1, 0],
     [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 7, 7, 3, 7, 1, 1, 1, 1, 0],
     [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 7, 7, 7, 7, 7, 1, 7, 0],
     [0, 7, 7, 7, 7, 7, 7, 7, 3, 3, 1, 1, 1, 7, 7, 7, 1, 7, 7, 0],
     [0, 7, 7, 7, 7, 7, 7, 7, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0],
     [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 8, 7, 7, 0],
     [0, 7, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 0],
     [0, 1, 1, 3, 1, 7, 7, 7, 7, 7, 7, 7, 1, 1, 7, 7, 7, 7, 7, 0],
     [0, 7, 7, 3, 7, 1, 1, 7, 7, 7, 7, 3, 3, 7, 1, 7, 7, 1, 7, 0],
     [0, 7, 1, 3, 8, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 1, 7, 1, 7, 0],
     [0, 7, 1, 1, 7, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 7, 0],
     [0, 7, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 8, 7, 7, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
