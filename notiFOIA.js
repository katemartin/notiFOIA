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
    'link_to_foia_letter': headers.indexOf('link_to_foia_letter'),
    'notes': headers.indexOf('notes'),
    'contact_name': headers.indexOf('contact_name'),
    'contact_email': headers.indexOf('contact_email'),
    'contact_phone': headers.indexOf('contact_phone'),
    'ID': headers.indexOf('ID'),
  };

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var number = row[columns.days_overdue];
    var recipient = row[columns.email];

    if (number >= 10) {
      var subject = `re: notiFOIA: request overdue by ${number} days. ${row[columns.agency_name]}, ${row[columns.short_description]}`; // Customize the subject line here
      var message = `A request is overdue by more than 10 days:
        uniqueID: ${row[columns.ID]}
        Project_name: ${row[columns.Project_name]}
        Agency name: ${row[columns.agency_name]}
        State: ${row[columns.state]}
        Due date: ${row[columns.due_date]}
        Days overdue: ${number}
        Link to foia: ${row[columns.link_to_foia_letter]}
        Notes: ${row[columns.notes]}
        Contact name: ${row[columns.contact_name]}
        Contact email: ${row[columns.contact_email]}
        Contact phone: ${row[columns.contact_phone]}

        If this is in error, please update your spreadsheet to prevent future notifications.

        NotiFOIA, a FOIA notification tool, was created by Kate Martin. You can reach her on socials under the handle katereports, or at katie.martin.13@gmail.com`; // Customize the email body here

      sendEmail(recipient, subject, message);
    }
  }
}

function sendEmail(recipient, subject, message) {
  MailApp.sendEmail(recipient, subject, message);
}
