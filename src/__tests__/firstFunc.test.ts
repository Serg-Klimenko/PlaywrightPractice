function sum(a, b) {
    return a + b;
}
function biggerThenHalf() {
    const result = Math.random() >= 0.5 ? "Yes" : "No";
    return result;
  }
describe("First test", () => {
    test("Sum", () => {
      expect(sum(2, 7)).toEqual(9);
    });

    test("Random number bigger 0.5", () => {
        expect(biggerThenHalf()).toEqual("Yes");
    });
})
