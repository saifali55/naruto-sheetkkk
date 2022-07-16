import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense
});


export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      kind = '',
      classified = '',
      img = '',
      ram = '',
      graphics = '',
      display = '',
      storage = '',
      op = '',
      motherboard = '',
      img1 = '',
      img2 = '',
      img3 = '',
      youtube = '',
      cpu = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, kind,classified, img,ram,graphics, display, storage,op,
      motherboard, img1, img2, img3, youtube, cpu, note, amount, createdAt };

    return database.ref(`expenses/laptop`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  }
}

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const startRemoveExpenses = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`expenses/laptop/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    })
  }
}
// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

export const startEditExpenses = (id, updates) => {
  return (dispatch) => {
    // const uid = getState().auth.uid;
    return database.ref(`expenses/laptop/${id}`)
      .update(updates)
      .then(() => dispatch(startEditExpenses(id, updates)));

  }
}

// ADD_EXPENSES
export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses
})
export const startSetExpenses = () => {
  return (dispatch) => {
    // const uid = getState().auth.uid;
    return database.ref(`expenses/laptop`).once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setExpenses(expenses));
    })
  }
}


