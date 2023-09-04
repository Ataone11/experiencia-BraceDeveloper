/* eslint-disable no-unused-vars */
export enum TestActionType {
  loading = 'loading'
}

export const callSetLoading = async (state: boolean, dispatch: any) => {
  dispatch({
    type: TestActionType.loading,
    payload: state
  })
}
