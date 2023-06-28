//notiFOIA

function checkNumberAndSendEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  var headers = data[0]; // Assumes the first row contains the column header
    
  var daysoverdueColumnIndex = headers.indexOf('days_overdue'); // Replace 'days_overdue' with the actual column header for days overdue
  var emailColumnIndex = headers.indexOf('email'); // Replace 'email' with the actual column header for the recipient's email
  var agencynameColumnIndex = headers.indexOf('agency_name'); // Replace 'agency_name' with the actual column header for the agency name
  var stateColumnIndex = headers.indexOf('state'); // Replace 'state' with the actual column header for the additional information
  var shortdescriptionColumnIndex = headers.indexOf('short_description'); // Replace 'short_description' with the actual column header for the short description of the request
  var projectnameColumnIndex = headers.indexOf('Project_name'); // Replace 'Additional Info' with the actual column header for the project name
  var duedateColumnIndex = headers.indexOf('due_date'); // Replace 'Additional Info' with the actual column header for the request due date
  var foialinkColumnIndex = headers.indexOf('link_to_foia_letter'); // Replace 'Additional Info' with the actual column header for the link to the FOIA letter    
  var notesColumnIndex = headers.indexOf('notes'); // Replace 'Additional Info' with the actual column header for the notes column    
  var nameColumnIndex = headers.indexOf('contact_name'); // Replace 'Additional Info' with the actual column header for the FOIA contact name    
  var contactemailColumnIndex = headers.indexOf('contact_email'); // Replace 'Additional Info' with the actual column header for the FOIA contact email    
  var phoneColumnIndex = headers.indexOf('contact_phone'); // Replace 'Additional Info' with the actual column header for the FOIA contact phone
  var idColumnIndex = headers.indexOf('ID'); // Replace 'ID' with the actual column header for the request ID
  var spreadsheetColumnIndex = headers.indexOf('spreadsheet_link'); // Replace 'spreadsheet_link' with the actual link to your spreadsheet
    
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var number = row[daysoverdueColumnIndex];
    var recipient = row[emailColumnIndex];

    if (number >= 10) {
      var subject = `re: notiFOIA: request overdue by ${row[daysoverdueColumnIndex]} days. ${row[agencynameColumnIndex]}, ${row[shortdescriptionColumnIndex]}`; // Customize the subject line here
      var message = 
        `A request is overdue by more than 10 days:
        uniqueID: ${row[idColumnIndex]}
        Project_name: ${row[projectnameColumnIndex]}
        Agency name: ${row[agencynameColumnIndex]}
        State: ${row[stateColumnIndex]}
        Due date: ${row[duedateColumnIndex]}
        Days overdue: ${row[daysoverdueColumnIndex]}
        Link to foia: ${row[foialinkColumnIndex]}
        Notes: ${row[notesColumnIndex]}
        Contact name: ${row[nameColumnIndex]}
        Contact email: ${row[contactemailColumnIndex]}
        Contact phone: ${row[phoneColumnIndex]}

       If this is in error please update your spreadsheet (located ${row[spreadsheetColumnIndex]} here) to prevent future notifications.

       NotiFOIA, a FOIA notification tool, was created by Kate Martin. You can reach her on twitter https://twitter.com/katereports or at katie.martin.13@gmail.com`; // Customize the email body here
       sendEmail(recipient, subject, message);
    }
  }
}

function sendEmail(recipient, subject, message) {
  MailApp.sendEmail(recipient, subject, message);
}
