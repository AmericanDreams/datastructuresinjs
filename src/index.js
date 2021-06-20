import * as Util from "./util/Util";
import BogoSort from "./algorithms/sort/BogoSort";
import BubbleSort from "./algorithms/sort/BubbleSort";
import SelectionSort from "./algorithms/sort/SelectionSort";

const array = [4, 55, 67, 1, -6, 789];

const sort = new SelectionSort(array);
sort.sort();
