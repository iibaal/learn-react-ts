import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/tripLuggageCheck")({
  component: TripLuggageChecker,
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

function TripLuggageChecker() {
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

  function calculateCompletion() {
    let completion = 0;
    let totalLuggage: number = 0;

    //calculate completion
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
    return completion;
  }

  let completion: number = calculateCompletion();

  function LuggageList() {
    {
      return luggageList.length > 0
        ? luggageList.map((e) => (
            <ListItem item={e} onDeleteItem={deleteLuggage} onToggleItem={handleCheckbox} />
          ))
        : "List is Empty :)";
    }
  }

  function Form() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      // Create a FormData object from the form
      const formData = new FormData(e.currentTarget);

      // Retrieve the values using the FormData API one by one and set the type for it
      const luggageName = formData.get("luggageName") as string;
      const quantity = formData.get("quantity") as string;
      const timestamp = new Date();

      // set data
      const data = { quantity: parseInt(quantity), luggageName, isReady: false, timestamp };

      setLuggageList([...luggageList, data]);
    }

    return (
      <form method="post" onSubmit={handleSubmit}>
        <select id="quantity" name="quantity">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        <input
          className="border-1 border-gray-300 rounded-xs mx-2"
          placeholder="Type item name here..."
          type="text"
          name="luggageName"
        />
        <button type="submit">submit</button>
      </form>
    );
  }

  function CompletionStatus({ completion }: { completion: number }) {
    return (
      <div>
        {completion == 100
          ? `You have packed all of your items :)`
          : `You have ${luggageList.length}
        items on your list, and you already packed ${completion}%`}
      </div>
    );
  }

  function Header() {
    return <>Trip Checker</>;
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

  return (
    <>
      <Header />
      <Form />
      <LuggageList />
      <SortTypePicker sortType={sortType} functionCallback={handleSort} />
      <ClearLuggageList handleClearLuggageList={handleClearLuggageList} />
      <CompletionStatus completion={completion} />
    </>
  );

  function handleClearLuggageList() {
    const isClearList = confirm("Are you sure you want to clear the luggage list?");
    if (isClearList) setLuggageList([]);
  }

  function handleSort(event: React.FormEvent<HTMLFormElement>) {
    setSortType(event.currentTarget.value);
    setLuggageList(sortArray(luggageList, event.currentTarget.value));
  }

  function sortArray(
    array: LuggageItem[],
    sortType: "timestamp" | "luggageName" | "isReady" | "quantity"
  ) {
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
  function deleteLuggage(luggageName: string) {
    const filteredLuggageList = luggageList.filter((e) => e.luggageName != luggageName);
    setLuggageList(filteredLuggageList);
  }

  function handleCheckbox(luggageName: string) {
    setLuggageList((prevItems) =>
      prevItems.map((item, i) =>
        item.luggageName === luggageName ? { ...item, isReady: !item.isReady } : item
      )
    );
  }
}

function ClearLuggageList({ handleClearLuggageList }) {
  return <button onClick={() => handleClearLuggageList()}>abcd</button>;
}

function SortTypePicker({
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
  onDeleteItem,
  onToggleItem,
}: {
  item: LuggageItem;
  onDeleteItem: void;
  onToggleItem: void;
}) {
  return (
    <div>
      <input
        type="checkbox"
        checked={item.isReady}
        onChange={() => onToggleItem(item.luggageName)}
      />
      <span className="mx-2">
        {item.quantity} {item.luggageName} {item.timestamp.getMinutes()}:
        {item.timestamp.getSeconds()}
      </span>
      <button className="text-red-700" onClick={() => onDeleteItem(item.luggageName)}>
        Delete
      </button>
    </div>
  );
}
