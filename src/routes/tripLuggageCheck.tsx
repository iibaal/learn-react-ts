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
}

function tripLuggageCheck() {
  const [luggageList, setLuggageList] = useState<LuggageItem[]>([]);

  let completion = 0;
  let totalLuggage = 0;
  for (let index = 0; index < luggageList.length; index++) {
    const element = luggageList[index];
    if (element.isReady) {
      totalLuggage++;
    }
  }
  completion = (totalLuggage / luggageList.length) * 100;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Retrieve the values using the FormData API one by one and set the type for it
    const luggageName = formData.get("luggageName") as string;
    const quantity = formData.get("quantity") as string;

    //set it as
    const data = { quantity: parseInt(quantity), luggageName, isReady: false };

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
          <input type="text" name="luggageName" />
          <button type="submit">submit</button>
        </form>
      </div>
      {luggageList.length > 0
        ? luggageList.map((e) => (
            <ListItem
              item={e}
              buttonCallback={deleteLuggage}
              checkboxCallback={handleCheckbox}
            />
          ))
        : "List is Empty :)"}
      <div>You Have {completion}%</div>
    </div>
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
      {item.quantity} {item.luggageName}{" "}
      <button
        className="text-red-700"
        onClick={() => buttonCallback(item.luggageName)}
      >
        Delete
      </button>
    </div>
  );
}
