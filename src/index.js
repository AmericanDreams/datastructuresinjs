import * as Util from "./util/Util";

import HashTable from "./ds/hashtable/HashTableWithChaining";

const hashTable = new HashTable();
hashTable.put("bir", 1);
hashTable.put("iki", 2);
hashTable.put("uc", 3);
hashTable.put("dort", 4);
hashTable.put("bes", 5);
hashTable.put("alti", 6);

hashTable.put("", 666);

hashTable.put("alti", 7);

//hashTable.print();

// Util.print(hashTable.get("alti"));
// Util.print(hashTable.get("alal"));
// Util.print(hashTable.get(""));

Util.print(hashTable.set("alti", 66));

Util.print(hashTable.set("eded", 77));

Util.print(hashTable.remove("alti"));

Util.print(hashTable.remove("dort"));

hashTable.print();
