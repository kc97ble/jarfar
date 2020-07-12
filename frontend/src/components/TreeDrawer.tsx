import * as React from "react";

type Uuid = string;

type Tree = {
  id: Uuid;
  wives: Array<Tree>;
  children: Array<Tree>;
};

type Person = {
  id: Uuid;
  father_id: Uuid;
  mother_id: Uuid;
  husband_id: Uuid;
  display_name: string;
};

type Props = {
  people: Array<Person>;
  root: Tree;
};

let cache = {};

function getPerson(people: Array<Person>, id: Uuid) {
  if (id in cache) return cache[id];
  for (let p of people) {
    cache[p.id] = p;
  }
  return cache[id];
}

function Branch(props: Props) {
  const { people, root } = props;
  const rootPerson = getPerson(people, root.id);
  return (
    <div>
      <a href={`/pha-do/${rootPerson.id}`}>{rootPerson.display_name}</a>
      <ul>
        {root.children.map((c) => (
          <li>
            <Branch people={people} root={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TreeDrawer(props: Props) {
  return (
    <ul>
      <li>
        <Branch {...props} />
      </li>
    </ul>
  );
}

export default TreeDrawer;
