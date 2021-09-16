export interface State {
  token: string;
}

export default (): State => ({
  token: "",
});
