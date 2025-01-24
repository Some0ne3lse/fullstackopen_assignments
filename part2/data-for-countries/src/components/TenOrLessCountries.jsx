const TenOrLessCountries = ({ countries, onClick }) => {
  return (
    <div>
      {countries.map((c) => (
        <p key={c.name.common}>
          {c.name.common}{" "}
          <button onClick={() => onClick(c.name.common)}>show</button>
        </p>
      ))}
    </div>
  );
};

export default TenOrLessCountries;
