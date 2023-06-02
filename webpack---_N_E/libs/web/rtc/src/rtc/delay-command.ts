export default class DelayCommand {
  private id: ReturnType<typeof setTimeout>

  constructor(delay: number, action: () => void) {
    this.id = setTimeout(action, delay * 1000)
  }

  Cancel() {
    clearTimeout(this.id)
  }
}
