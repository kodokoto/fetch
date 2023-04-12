// capitalise the first letter of a string and lowercase the rest
export function titleCase(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function parseBookingFrequency(bookingFrequency: string) {
    switch (bookingFrequency) {
      case 'ONE_OFF':
        return 'One Off'
      case 'WEEKLY':
        return 'Every Week'
      case 'BI_WEEKLY':
        return 'Every Two Weeks'
      case 'MONTHLY':
        return 'Every Month'
      default:
        return ''
    }
  }
  
export function parseServiceType(serviceType: string) {
    switch (serviceType) {
      case 'WALK':
        return 'Walking'
      case 'PET_CARE':
        return 'Pet care'
      case 'HOUSE_SITTING':
        return 'House sitting'
      case 'MONTHLY':
        return 'Every Month'
      default:
        return ''
    }
  }
  
  export function capitalizeWords(inputString) {
    return inputString.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
  }
  
  export function parseTime(TimeOfDay: string){
    switch (TimeOfDay) {
      case 'ANY':
        return 'Any'
      case 'MORNING':
        return '6am-11am'
      case 'AFTERNOON':
        return '11am-3pm'
      case 'EVENING':
        return '3pm-10pm'
      default:
        return ''
    }
  }