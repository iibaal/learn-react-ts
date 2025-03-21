import { createFileRoute } from "@tanstack/react-router";
import { FormEventHandler, useState } from "react";

export const Route = createFileRoute("/tripLuggageCheck")({
  component: tripLuggageCheck,
});

/*
dropdown for how much item
item name
add item button

show object array list

sorting
clear the list

You have X item in your list, and you already packed Y%


*/

interface LuggageItem {
  quantity: number;
  luggageName: string;
  isReady: boolean;
  timestamp: Date;
}

function tripLuggageCheck() {
  const [luggageList, setLuggageList] = useState<LuggageItem[]>([
    {
      quantity: 5,
      luggageName: "Motor",
      isReady: false,
      timestamp: new Date(),
    },
    {
      quantity: 1,
      luggageName: "Sepeda",
      isReady: false,
      timestamp: new Date(),
    },
    {
      quantity: 2,
      luggageName: "Kunci",
      isReady: false,
      timestamp: new Date(),
    },
  ]);
  const [sortType, setSortType] = useState<string>("inputorder");

  let completion: number = 0;
  let totalLuggage = 0;

  if (luggageList.length > 0) {
    for (let index = 0; index < luggageList.length; index++) {
      const element = luggageList[index];
      if (element.isReady) {
        totalLuggage++;
      }
    }
    completion = (totalLuggage / luggageList.length) * 100;
    completion = parseFloat(completion.toPrecision(3));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Retrieve the values using the FormData API one by one and set the type for it
    const luggageName = formData.get("luggageName") as string;
    const quantity = formData.get("quantity") as string;
    const timestamp = new Date();

    // set data
    const data = {
      quantity: parseInt(quantity),
      luggageName,
      isReady: false,
      timestamp,
    };

    setLuggageList([...luggageList, data]);
  }

  function deleteLuggage(luggageName: string) {
    const filteredLuggageList = luggageList.filter(
      (e) => e.luggageName != luggageName
    );
    setLuggageList(filteredLuggageList);
  }

  function handleCheckbox(luggageName: string) {
    setLuggageList((prevItems) =>
      prevItems.map((item, i) =>
        item.luggageName === luggageName
          ? { ...item, isReady: !item.isReady }
          : item
      )
    );
  }

  function RenderLuggageList() {
    {
      return luggageList.length > 0
        ? luggageList.map((e) => (
            <ListItem
              item={e}
              buttonCallback={deleteLuggage}
              checkboxCallback={handleCheckbox}
            />
          ))
        : "List is Empty :)";
    }
  }

  function handleSort(e: React.FormEvent<HTMLFormElement>) {
    setSortType(e.currentTarget.value);

    let sortedArray = sortArray(luggageList, e.currentTarget.value);

    setLuggageList(sortedArray);
  }

  function sortArray(array, sortType) {
    console.log(sortType);
    const sortedArray = array.sort(function (a, b) {
      if (a[sortType] < b[sortType]) {
        return -1;
      }
      if (a[sortType] > b[sortType]) {
        return 1;
      }
      return 0;
    });
    return sortedArray;
  }

  return (
    <div>
      Trip Checker
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <select id="quantity" name="quantity">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          <input
            className="border-1 border-gray-300 rounded-xs mx-2"
            type="text"
            name="luggageName"
          />
          <button type="submit">submit</button>
        </form>
        <RenderLuggageList />
      </div>
      <SortPicker sortType={sortType} functionCallback={handleSort} />
      <div>
        {completion == 100
          ? `You have packed all of your items :)`
          : `You have ${luggageList.length} items on your list, and you already packed ${completion}%`}
      </div>
    </div>
  );
}

function SortPicker({
  sortType,
  functionCallback,
}: {
  sortType: string;
  functionCallback: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <select id="sort" name="sort" value={sortType} onChange={functionCallback}>
      <option value={"timestamp"}>SORT BY INPUT ORDER</option>
      <option value={"luggageName"}>SORT BY DESCRIPTION</option>
      <option value={"isReady"}>SORT BY PACKED STATUS</option>
      <option value={"quantity"}>SORT BY ITEM QUANTITY</option>
    </select>
  );
}

function ListItem({
  item,
  buttonCallback,
  checkboxCallback,
}: {
  item: LuggageItem;
  buttonCallback: void;
  checkboxCallback: void;
}) {
  return (
    <div>
      <input
        type="checkbox"
        checked={item.isReady}
        onChange={() => checkboxCallback(item.luggageName)}
      />
      <span className="mx-2">
        {item.quantity} {item.luggageName} {item.timestamp.getMinutes()}:
        {item.timestamp.getSeconds()}
      </span>
      <button
        className="text-red-700"
        onClick={() => buttonCallback(item.luggageName)}
      >
        Delete
      </button>
    </div>
  );
}
