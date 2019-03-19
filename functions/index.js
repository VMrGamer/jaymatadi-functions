const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
exports.addMoney = functions.firestore
    .document('wallets/{uid}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
  
        const previousValue = change.before.data();

        if(newValue.update){
            change.after.ref.set({
                credit: newValue.credit + previousValue.credit,
                update: false
              }, {merge: true});
              return true;
        }
        return false;
      });