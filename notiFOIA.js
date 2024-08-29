//notiFOIA

function checkNumberAndSendEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0]; // Assumes the first row contains the column header

  var columns = {
    'days_overdue': headers.indexOf('days_overdue'),
    'email': headers.indexOf('email'),
    'agency_name': headers.indexOf('agency_name'),
    'state': headers.indexOf('state'),
    'short_description': headers.indexOf('short_description'),
    'Project_name': headers.indexOf('Project_name'),
    'due_date': headers.indexOf('due_date'),
    'notes': headers.indexOf('notes'),
    'contact_name': headers.indexOf('contact_name'),
    'contact_email': headers.indexOf('contact_email'),
    'contact_phone': headers.indexOf('contact_phone'),
    'agency_foia_number': headers.indexOf('agency_foia_number'),
    'ID': headers.indexOf('ID'),
  };

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var number = row[columns.days_overdue];
    var recipient = row[columns.email];

// Number of days grace period set to zero. You can add more if you want an email x days after the request is due.
// The text of the email sent to you follows:
    if (number >= 1) {
      var subject = `re: notiFOIA: request overdue by ${number} days. ${row[columns.agency_name]}, ${row[columns.short_description]}`; // Customize the subject line here
      var message = `A request is overdue:
        uniqueID: ${row[columns.ID]}
        Project_name: ${row[columns.Project_name]}
        Agency name: ${row[columns.agency_name]}
        State: ${row[columns.state]}
        Due date: ${row[columns.due_date]}
        Days overdue: ${number}
        Notes: ${row[columns.notes]}
        Contact name: ${row[columns.contact_name]}
        Contact email: ${row[columns.contact_email]}
        Contact phone: ${row[columns.contact_phone]}
        Agency FOIA number: ${row[columns.agency_foia_number]}
        
        If this is in error, please update  the "records_received" column in your notiFOIA spreadsheet to prevent future notifications. To provide a grace period, type a number in the add_days column to extend the deadline.
        
        NotiFOIA, a FOIA notification tool, was created by Kate Martin. You can reach her on socials under the handle katereports on most social media, or at katie.martin.13@gmail.com`; // Customize the email body here

      sendEmail(recipient, subject, message);
    }
  }
}

function sendEmail(recipient, subject, message) {
  MailApp.sendEmail(recipient, subject, message);
}
