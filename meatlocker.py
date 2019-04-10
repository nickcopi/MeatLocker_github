#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, base64
errorString ="Invalid arguments. Example: meatlocker.py [-d/-e] [key] [input file] [output file]"
baseshorthand = [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "◘", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1","☺","☻","♥","♦","♣","♠","•"]
baseletters = [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "\\", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1" ]
shorthand = [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "◘", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1","☺","☻","♥","♦","♣","♠","•"] 
letters = [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "\\", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1" ]

if len (sys.argv) != 5:
    print(errorString)
    exit()
def shuffle(key):
    numkey = a2d(key)
    fullkey = ""
    for i in range(400):
        for j in range(len(numkey)):
            temp = int(numkey[j] + str(i))
            if temp >= len(letters):
                temp -= len(letters)
            fullkey += str(temp)
    if len(fullkey) % 2 != 0:
        fullkey += "9"
    finalkey = ""
    for i in range(0,len(fullkey)/2):
        finalkey += fullkey[i] + fullkey[len(fullkey)-1-i]
    if len(finalkey) % 4 != 0:
        finalkey+="89"
    for i in range(0,len(finalkey),4):
        f1 = int(finalkey[i] + finalkey[i+1])
        f2 = int(finalkey[i+2] + finalkey[i+3])
        c1 = shorthand[f1]
        c2 = shorthand[f2]
        shorthand[f1] = c2
        shorthand[f2] = c1
        if f1 >= len(letters):
            f1 -= 10
        if f2 >= len(letters):
            f2 -= 10
        c1 = letters[f1]
        c2 = letters[f2]
        letters[f1] = c2
        letters[f2] = c1
def encrypt(text):
    trans = ""
    for i in text:
        z = letters.index(i)
        if z < 10:
            temp = z 
            z = "0" + str(temp)
        trans += str(z)
    print("encrypted")
    return trans
def compress(text):
    compressed = ""
    for i in range(len(text)/2):
        compressed += shorthand[int(text[i] + text[len(text)-1-i])]
    return compressed
def decompress(text):
    part1 = ""
    part2 = ""
    format1 = ""
    format2 = ""
    piece = ""
    for i in text:
        try:
            piece = shorthand.index(i)
        except:
            piece = ""
            format1  += i
        if format1 != "":
            try:
                format2 = format1.decode("utf-8")
                #piece = shorthand.index(format2)
                for j in range(len(shorthand)):
                    if shorthand[j].decode('utf-8') == format2:
                        piece = j
                format1 = ""
            except:
                part1 += ""
        if piece != "":
            if piece < 10:
                piece = "0" + str(piece)
            else: 
                piece = str(piece)
            part1 += piece[0]
            part2 += piece[1]
    return part1 + part2 [::-1]
def decrypt(text):
    clean = ""
    for i in range(0,len(text),2):
        if int(text[i] + text[i+1]) >= len(letters):
            clean += "a"
        else: 
            clean += letters[int(text[i] + text[i+1])]
    return clean
def a2d(text):
    total = ""
    for x in text:
        total += str(ord(x))
    return total
shuffle(sys.argv[2])
try: 
    with open(sys.argv[3], mode='rb') as file:
            fileContent = file.read()
except:
    print("Failed to open " + sys.argv[3] + " for reading.")
    exit()
try: 
    f = open(sys.argv[4], 'wt')
except:
    print("Failed to open " + sys.argv[4] + " for writing.")
    exit()
if sys.argv[1] == "-e":
    f.write(compress(encrypt(base64.b64encode(fileContent))))
    #print(compress(encrypt(base64.b64encode(sys.argv[3]))))
elif sys.argv[1] == "-d":
    f.write(base64.b64decode(decrypt(decompress(fileContent))))
    #print(base64.b64decode(decrypt(decompress(compress(encrypt(base64.b64encode(sys.argv[3])))))))
else:
    print(errorString)
