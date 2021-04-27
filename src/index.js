import ArrayList from "./ds/list/ArrayList";
import SingleLinkedList from "./ds/list/linkedlist/SingleLinkedList";
import * as Util from "./util/Util";

const arrayList = new SingleLinkedList();
arrayList.add(1);
arrayList.add(2);
arrayList.add(3);
arrayList.add(4);
arrayList.add(5);

arrayList.print();

arrayList.remove(0);
arrayList.add(1);

arrayList.print();

arrayList.set(4, 6);

arrayList.print();

Util.print("[0] = " + arrayList.get(0));

arrayList.addToHead(1);

arrayList.print();

Util.print("[0] = " + arrayList.get(0));

arrayList.add(7);
arrayList.add(8);
arrayList.add(9);
arrayList.add(10);
arrayList.add(11);

arrayList.print();

Util.print("size = " + arrayList.size());
