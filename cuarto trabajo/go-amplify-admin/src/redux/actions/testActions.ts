export enum TestActionType {
  test = "test",
}

export const testAction = async (dispatch: any) => {
  dispatch({
    type: TestActionType.test,
    payload: true,
  });
};
