import { createFileRoute } from "@tanstack/react-router";
import { split } from "postcss/lib/list";
import { useState } from "react";

export const Route = createFileRoute("/eatnsplit")({
  component: EatNSplit,
});

interface Friends {
  name: string;
  imageUrl: string;
  debt: number;
}

const templateFriend = [
  {
    name: "Ahmed",
    imageUrl:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    debt: 0,
  },
  {
    name: "Pepe",
    imageUrl:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    debt: 0,
  },
];

function EatNSplit() {
  const [splitBillFriend, setSplitBillFriend] = useState<string>();
  const [friendList, setFriendList] = useState<Friends[]>(templateFriend);

  function handleAddFriendSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Retrieve the values using the FormData API one by one and set the type for it
    const name = formData.get("name") as string;
    const imageUrl = formData.get("imageUrl") as string;

    setFriendList((e) => [...e, { name, imageUrl, debt: 0 }]);
    // setFriendList()
  }

  function handleSplitBillSubmit(e, setBillValue, setMyExpense) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Retrieve the values using the FormData API one by one and set the type for it
    const friendName = formData.get("friendName") as string;
    const friendExpense = formData.get("friendExpense") as number;
    const whoPays = formData.get("whoPays") as string;

    const expense =
      whoPays == "you" ? parseInt(friendExpense * -1) : parseInt(friendExpense);

    setFriendList((e) =>
      e.map((item) =>
        item.name == friendName
          ? { ...item, debt: parseInt(item.debt + expense) }
          : item
      )
    );
    setBillValue(0);
    setMyExpense(0);
  }

  function handleButton(friendName: string) {
    setSplitBillFriend(splitBillFriend == friendName ? "" : friendName);
  }

  return (
    <div className="flex flex-row mt-4">
      <div className="basis-1/2">
        <FriendList
          data={friendList}
          activeFriendName={splitBillFriend}
          handleButton={handleButton}
        />
        <AddFriend handleSubmit={handleAddFriendSubmit} />
      </div>
      <div className="basis-1/2">
        <SplitBill
          friendName={splitBillFriend}
          handleSubmit={handleSplitBillSubmit}
        />
      </div>
    </div>
  );
}

function FriendList({ data, activeFriendName, handleButton }) {
  return (
    <div>
      {data.map((e) => (
        <Item
          element={e}
          handleButton={handleButton}
          activeFriendName={activeFriendName}
        />
      ))}
    </div>
  );
}

function Item({
  element,
  activeFriendName,
  handleButton,
}: {
  element: Friends;
}) {
  return (
    <div className="border-1 mb-2">
      {element.name}
      <div>
        {element.debt > 0
          ? `You owe ${element.name} ${element.debt}`
          : `${element.name} owe you ${element.debt}`}
      </div>
      <img src={element.imageUrl} />
      <button onClick={() => handleButton(element.name)}>
        {activeFriendName == element.name ? "Close" : "Open"}
      </button>
    </div>
  );
}

function SplitBill({ friendName, handleSubmit }) {
  const [billValue, setBillValue] = useState(0);
  const [myExpense, setMyExpense] = useState(0);
  // const [friendExpense, setFriendExpense] = useState(0);
  const [whoPays, setWhoPays] = useState(0);

  const friendExpense = billValue - myExpense;
  if (friendName?.length > 0) {
    return (
      <form
        onSubmit={(e) => handleSubmit(e, setBillValue, setMyExpense)}
        className="text-start mx-5"
      >
        <div>
          <label>Bill Value</label>
          <input
            type={"number"}
            onChange={(e) => setBillValue(parseInt(e.target.value))}
            value={billValue}
          />
        </div>
        <div>
          <label>Your Expense</label>
          <input
            type="number"
            onChange={(e) => setMyExpense(parseInt(e.target.value))}
            value={myExpense}
          />
        </div>
        <div>
          <label>{friendName} Expense</label>
          <input
            readOnly
            type="number"
            name="friendExpense"
            value={friendExpense}
          />
        </div>
        <div>
          <input name="friendName" type="hidden" value={friendName} />
          <label>Who is paying the bill</label>
          <select
            value={whoPays}
            name="whoPays"
            onChange={(e) => setWhoPays(e.target.value)}
          >
            <option value={"you"}>You</option>
            <option value={"friend"}>{friendName}</option>
          </select>
        </div>
        <button>Split Bill</button>
      </form>
    );
  }
}

function AddFriend({ handleSubmit }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      {isOpen && <AddFriendForm handleSubmit={handleSubmit} />}
      <button onClick={() => setIsOpen((e) => !e)}>Add Friend</button>
    </div>
  );
}

function AddFriendForm({ handleSubmit }) {
  const [friendName, setFriendName] = useState("Yanto");
  const [imageUrl, setImageUrl] = useState(
    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
  );

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        name="name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={imageUrl}
        name="imageUrl"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div>
        <button
          type="submit"
          className={"px-2 rounded-2xl text-sky-700 border-1 border-b-blue-400"}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
