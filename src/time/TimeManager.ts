export interface TimeConfig {
  dayLength: number;
  nightLength: number;
}

export class TimeManager {
  private dayLength: number;
  private nightLength: number;
  private currentTime = 0;

  constructor(config: TimeConfig) {
    this.dayLength = config.dayLength;
    this.nightLength = config.nightLength;
  }

  public tick(seconds: number): void {
    this.currentTime += seconds;
  }

  public getCurrentTimeFormatted(): string {
    const cycle = this.dayLength + this.nightLength;
    const timeInCycle = this.currentTime % cycle;
    const hours = Math.floor((timeInCycle / cycle) * 24);
    const minutes = Math.floor((((timeInCycle / cycle) * 24) - hours) * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  public getCurrentPhase(): string {
    const cycle = this.dayLength + this.nightLength;
    return (this.currentTime % cycle) < this.dayLength ? "Day" : "Night";
  }

  public getProgress(): number {
    const cycle = this.dayLength + this.nightLength;
    return ((this.currentTime % cycle) / cycle) * 100;
  }
}
