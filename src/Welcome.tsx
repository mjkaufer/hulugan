interface IWelcomeProps {
  onClick: () => void;
}
function Welcome(props: IWelcomeProps) {
  return (
    <div>
      <h1>Welcome to Hulugan!</h1>
      <p>Find your next nine perfect series here!!!</p>
      <div onClick={props.onClick} className="cute-as-a">Let's get it!</div>
    </div>
  )
}

export default Welcome;