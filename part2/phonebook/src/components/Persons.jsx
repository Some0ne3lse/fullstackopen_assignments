const Persons = ({ personsList, deleteFunction }) => {
  return (
    <div>
      {personsList.map((p) => (
        <div key={p.name}>
          {p.name} {p.number}{" "}
          <button onClick={() => deleteFunction(p.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
