import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayDate',
  standalone: true
})
export class DisplayDatePipe implements PipeTransform {

  transform(isoDate: Date | null): string {
    if (isoDate==null) {
      return "";
    }
    // Create a Date object from the ISO string
    const date = new Date(isoDate);

    // Get year, month (0-indexed), and day
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // Define Hebrew month names (adjust if needed)
    const hebrewMonths = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
      "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

    // Format the date string in Hebrew
    return `${day} ${hebrewMonths[month]} ${year}`;
  }

}
