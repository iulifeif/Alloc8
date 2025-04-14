const HomePage = () => {
  return (
    <h1>
      Hello {localStorage.getItem("username") ?? "Guest"}! This is the main
      page.
    </h1>
  );
};

export default HomePage;
