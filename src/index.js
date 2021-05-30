import * as Util from "./util/Util";
import Trie from "./ds/trie/Trie";
import AA from "./ds/associativearray/AABasedOnTrie";

// const trie = new Trie();
// Util.print(trie.insert("salam"));
// Util.print(trie.insert("salam"));
// Util.print(trie.insert("sal"));
// Util.print(trie.insert("necesen"));

// Util.print("printing started");
// trie.printSorted();
// Util.print("printing finished");

// Util.print(trie.contains("s"));
// Util.print(trie.contains("salam"));
// Util.print(trie.contains("salamlar"));

// Util.print("remove started");
// Util.print(trie.remove("al"));
// Util.print(trie.remove("salam"));

// Util.print("remove finished");
// Util.print(trie.contains("salam"));

// Util.print("reinsert started");
// Util.print(trie.insert("salam"));
// Util.print(trie.contains("salam"));

const aa = new AA();
Util.print(aa.insert("bir", 1));
Util.print(aa.insert("iki", 2));

Util.print(aa.find("uc"));
Util.print(aa.find("iki"));

Util.print(aa.remove("uc"));
Util.print(aa.remove("bir"));
Util.print(aa.find("bir"));

aa.insert("uc", 3);
aa.insert("dort", 4);

Util.print("printing");
aa.printSorted();
