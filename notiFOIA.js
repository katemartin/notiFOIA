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
  var emailColumnIndex = headers.indexOf('contact_email'); // Replace 'Additional Info' with the actual column header for the FOIA contact email    
  var phoneColumnIndex = headers.indexOf('contact_phone'); // Replace 'Additional Info' with the actual column header for the FOIA contact phone
  var idColumnIndex = headers.indexOf('ID'); // Replace 'ID' with the actual column header for the request ID
    
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var number = row[daysoverdueColumnIndex];
    var email = row[emailColumnIndex];

    if (number >= 10) {
      var subject = `re: request overdue: ${agency_name}, ${short_description}, ${days_overdue} days overdue`; // Customize the subject line here
      var message = `A request is overdue by more than 10 days:
        uniqueID: ${ID}
        Project_name: ${Project_name}
        Agency name: ${agency_name}
        State: ${state}
        Due date: ${due_date}
        Days overdue: ${days_overdue}
        Link to foia: ${link_to_foia_letter}
        Notes: ${notes}
        Contact name: ${contact_name}
        Contact email: ${contact_email}
        Contact phone: ${contact_phone}`; // Customize the email body here
      sendEmail(email, subject, message);
    }
  }
}

function sendEmail(recipient, subject, message) {
  MailApp.sendEmail(recipient, subject, message);
}
