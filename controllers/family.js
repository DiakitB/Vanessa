
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const File = require("../models/fileIModel")
// create  controllers for homeFile

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// CREATE A FUNCTION THAT WILL TAKE  A PAYMENT FREQUENCY AND A DATE AND RETURN THE NEXT PAYMENT DATE
// THE FUNCTION WILL TAKE IN TWO ARGUMENTS PAYMENT FREQUENCY AND DATE



// Example usage of the function getNextPaymentDate with a payment frequency of 'monthly' and the current date

exports.getFiles = asyncHandler(async (req, res) => {
   
   
    res.render('files');
   
});

exports.getAAFiles = asyncHandler(async (req, res) => {
    const files = await File.find();
    const newFilesArray = files.map(file => {
        console.log(file.url)
        const lastPaymentDate = file.payments[0]?.date ? new Date(file.payments[0].date) : null;
        const paymentFrequency = file.paymentFrequency;
        let nextDate = new Date();

        if (lastPaymentDate) {
            switch (paymentFrequency) {
                case 'weekly':
                    nextDate.setDate(lastPaymentDate.getDate() + 7);
                    break;
                case 'biweekly':
                    nextDate.setDate(lastPaymentDate.getDate() + 14);
                    break;
                case 'monthly':
                    nextDate.setMonth(lastPaymentDate.getMonth() + 1);
                    break;
                case 'quarterly':
                    nextDate.setMonth(lastPaymentDate.getMonth() + 3);
                    break;
                case 'annually':
                    nextDate.setFullYear(lastPaymentDate.getFullYear() + 1);
                    break;
                default:
                    nextDate = null;
            }
        } else {
            nextDate = null;
        }

        return { ...file.toObject(), nextDate: nextDate ? formatDate(nextDate) : 'N/A' };
    });

    console.log(newFilesArray);
 
    res.render('subfiles', { title: 'Files', files: newFilesArray });
});

exports.getOneFile = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);

   const payments = file.payments

   payments.forEach(payment => {
       console.log(payment.payment);
    });
  
    res.render('file', { payments: payments,  file });
}
);
// create controllers for create_getFile, create_postFile, deleteFile, updateFile, viewFile
 exports.create_getFile = asyncHandler(async (req, res) => {
    // get the enum values for the paymentFrequency

   

    const paymentFrequency = File.schema.path('paymentFrequency').enumValues;
  
    res.render('fileForm', { title: 'CREATE FILE', paymentFrequency });
    
 });

    

 exports.create_postFile = asyncHandler(async (req, res) => {
    console.log('THIS IS THE BODY');
    console.log(req.body);
  // check if the name file name already exists
    const file  = await File.findOne({ name: req.body.title });
    if (file) {
        res.render('fileForm', { title: 'CREATE FILE', errors: 'File name already exists' });
    } else {
        const newFile = new File(req.body);
        console.log('THIS IS THE NEW FILE');
        console.log(newFile);
        await newFile.save();
        res.redirect('/file/family');
    }

});




exports.makePayment = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);
    const date = new Date();
    const newdate = formatDate(date);
    console.log(file);
    console.log(newdate);
    const payments = file.payments;
    const newPayment = req.body;
    payments.unshift({ ...newPayment, date: newdate }); // add the new payment to the beginning of the array
    file.payments = payments;
    await file.save();
    res.redirect(`/file/subfiles/${file._id}`);
});

// create a function that will take an arry of payments and a total amount subtract the amount paid from the total amount
// and return the balance

exports.testFolderGet = asyncHandler(async (req, res) => {

    res.render('test2', { title: 'TEST FOLDER' });
});
exports.testFolderPost = asyncHandler(async (req, res) => {
    console.log('THIS IS THE BODY');
console.log(req.body);
    res.render('test2', { title: 'TEST FOLDER' });
});

