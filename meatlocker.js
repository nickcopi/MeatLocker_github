var meatLocker;
        meatLocker = {
            model:{
                utils:{
                    ascode:function(str){
                        var nums="";
                        for(i=0;i<str.length;i++){
                            nums+=String(str.charCodeAt(i));
                        }
                        return nums;

                    },
                    Base64 : {

                        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


                        encode : function (input) {
                            var output = "";
                            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                            var i = 0;
                            input = this._utf8_encode(input);

                            while (i < input.length) {

                                chr1 = input.charCodeAt(i++);
                                chr2 = input.charCodeAt(i++);
                                chr3 = input.charCodeAt(i++);

                                enc1 = chr1 >> 2;
                                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                                enc4 = chr3 & 63;

                                if (isNaN(chr2)) {
                                    enc3 = enc4 = 64;
                                } else if (isNaN(chr3)) {
                                    enc4 = 64;
                                }

                                output = output +
                                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                            }

                            return output;
                        },


                        decode : function (input) {
                            var output = "";
                            var chr1, chr2, chr3;
                            var enc1, enc2, enc3, enc4;
                            var i = 0;

                            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                            while (i < input.length) {

                                enc1 = this._keyStr.indexOf(input.charAt(i++));
                                enc2 = this._keyStr.indexOf(input.charAt(i++));
                                enc3 = this._keyStr.indexOf(input.charAt(i++));
                                enc4 = this._keyStr.indexOf(input.charAt(i++));

                                chr1 = (enc1 << 2) | (enc2 >> 4);
                                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                                chr3 = ((enc3 & 3) << 6) | enc4;

                                output = output + String.fromCharCode(chr1);

                                if (enc3 != 64) {
                                    output = output + String.fromCharCode(chr2);
                                }
                                if (enc4 != 64) {
                                    output = output + String.fromCharCode(chr3);
                                }

                            }

                            output = this._utf8_decode(output);

                            return output;

                        },


                        _utf8_encode : function (string) {
                            string = string.replace(/\r\n/g,"\n");
                            var utftext = "";

                            for (var n = 0; n < string.length; n++) {

                                var c = string.charCodeAt(n);

                                if (c < 128) {
                                    utftext += String.fromCharCode(c);
                                }
                                else if((c > 127) && (c < 2048)) {
                                    utftext += String.fromCharCode((c >> 6) | 192);
                                    utftext += String.fromCharCode((c & 63) | 128);
                                }
                                else {
                                    utftext += String.fromCharCode((c >> 12) | 224);
                                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                    utftext += String.fromCharCode((c & 63) | 128);
                                }

                            }

                            return utftext;
                        },


                        _utf8_decode : function (utftext) {
                            var string = "";
                            var i = 0;
                            var c = c1 = c2 = 0;

                            while ( i < utftext.length ) {

                                c = utftext.charCodeAt(i);

                                if (c < 128) {
                                    string += String.fromCharCode(c);
                                    i++;
                                }
                                else if((c > 191) && (c < 224)) {
                                    c2 = utftext.charCodeAt(i+1);
                                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                    i += 2;
                                }
                                else {
                                    c2 = utftext.charCodeAt(i+1);
                                    c3 = utftext.charCodeAt(i+2);
                                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                    i += 3;
                                }

                            }
                            return string;
                        }
                    },
                    checkShuffle: function(array1,array2){
                        var same = 0;
                        for(i=0;i<array1.length;i++){
                            if(array1[i]==array2[i]){
                                same++
                            }
                        }
                        return same/array1.length*100 + "% similar"
                    },
                    reverse: function(s){
                        return s.split("").reverse().join("");
                    }


                },
                crypt:{
                    baseshorthand : [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "?", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1","?","?","?","?","?","?","•"],
                    baseletters : [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "\\", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1" ],
                    shorthand : [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "?", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1","?","?","?","?","?","?","•"],
                    letters : [ "t", "{", "u", "0", "=", "l", "I", "B", "k", "j", "/", "c", "i", ".", "a", "+", "[", "}", "d", "]", "S", "|", ">", "T", "<", "\"", "\\", "A", "z", "C", "D", "E", "F", "G", "v", "(", "J", "K", "2", ")", "N", "O", "P", "Q", "R", "H", "e", "U", "V", "W", "X", "Y", "Z", "3", "?", "y", ":", "9", " ", "x", "w", "s", "_", "b", "q", "o", "#", "@", "$", "%", "^", "&", "*", ";", "M", "h", "'", "p", "r", "4", "5", "6", "7", "8", "n",",","!","-", "m", "g", "L", "f", "1" ],
                    encrypt:function(text){
                        var trans="";
                        for(i=0;i<text.length;i++){
							z = meatLocker.model.crypt.letters.indexOf(text[i]);
							if(z<10){
								var temp=z;
                                z="0";
                                z+=temp.toString();
                            }
                            trans+=z
                        }
                        return trans.toString()
                    },
                    decrypt: function(mess){
                        var clean="";
                        for(i=0;i<mess.length;i+=2){
                            if(Number(mess[i]+mess[i+1])>=meatLocker.model.crypt.letters.length){
                                clean += "a";//meatLocker.model.crypt.letters[Math.floor(Math.random()*meatLocker.model.crypt.letters.length)];//this is exploitable. not sure how to fix but if i were to try to brute force I would use this
                            } else {
                                clean += meatLocker.model.crypt.letters[Number(mess[i]+mess[i+1])];
                            }
                        }
                        return clean.toString()
                    },
                    compress: function(nums){
                        var compressed="";
                        for(i=0;i<nums.length/2;i++){
                            compressed += meatLocker.model.crypt.shorthand[Number(nums[i] + nums[nums.length-1-i])];
                        }
                        return compressed
                    },
                    decompress: function(comp){
                        var part1="";
                        var part2="";
                        for(i=0;i<comp.length;i++){
                            var piece = meatLocker.model.crypt.shorthand.indexOf(comp[i]);
                            if(piece < 10){
                                piece = "0" + piece.toString();
                            }
                            piece=piece.toString();
                            part1+=piece[0];
                            part2+=piece[1];
                        }
                        return part1+meatLocker.model.utils.reverse(part2);
                    },
                    shuffle(key){//Could probably be optimized but the real question is does it matter. The answer is probably no because it runs fine the way it is and shuffling doesn't take any longer with longer strings of text being encrypted.
                        var numkey = meatLocker.model.utils.ascode(key)
                        var fullkey ="";
                        for(i=0;i<400;i++){
                            for(j=0;j<numkey.length;j++){

                                var temp = Number(numkey[j] + i);
                                if(temp>=meatLocker.model.crypt.letters.length){
                                    temp-=meatLocker.model.crypt.letters.length
                                }
                                fullkey+=String(temp)
                            }
                        }

                        if(fullkey.length%2!=0){
                            fullkey+="9";
                        }
                        var finalkey="";
                        for(i=0;i<fullkey.length/2;i++){
                            finalkey +=fullkey[i] + fullkey[fullkey.length-1-i];
                        }

                        if(finalkey.length%4!=0){
                            finalkey+="89";
                        }
                        for(i=0;i<finalkey.length;i+=4){
                            var f1=Number(finalkey[i] + finalkey[i+1])
                            var f2=Number(finalkey[i+2] + finalkey[i+3])
                            var c1=meatLocker.model.crypt.shorthand[f1]
                            var c2=meatLocker.model.crypt.shorthand[f2]
                            meatLocker.model.crypt.shorthand[f1]=c2
                            meatLocker.model.crypt.shorthand[f2]=c1
                            if(f1>=meatLocker.model.crypt.letters.length){
                                f1-=10
                            }
                            if(f2>=meatLocker.model.crypt.letters.length){
                                f2-=10
                            }
                            var c1=meatLocker.model.crypt.letters[f1]
                            var c2=meatLocker.model.crypt.letters[f2]
                            meatLocker.model.crypt.letters[f1]=c2
                            meatLocker.model.crypt.letters[f2]=c1
                        }
                    },
                    reset: function(){
                        meatLocker.model.crypt.shorthand=new Array();
                        meatLocker.model.crypt.letters=new Array();
                        for(i=0;i<meatLocker.model.crypt.baseletters.length;i++){
                            meatLocker.model.crypt.letters.push(meatLocker.model.crypt.baseletters[i]);
                        }
                        for(i=0;i<meatLocker.model.crypt.baseshorthand.length;i++){
                            meatLocker.model.crypt.shorthand.push(meatLocker.model.crypt.baseshorthand[i]);
                        }
                    }

                }
            }
        }