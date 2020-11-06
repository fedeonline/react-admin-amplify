export class Parser {
  static storageBucket?: string;
  static storageRegion?: string;

  static parse(data: any): any {
    const parsedData = {};

    for (const field in data) {
      if (Array.isArray(data[field])) {
        parsedData[field] = this.parseValues(data[field]);
      } else {
        parsedData[field] = this.parseValue(data[field]);
      }
    }

    return parsedData;
  }

  static parseValues(values: any[]): any[] {
    const parsedValues = [];

    for (const value of values) {
      parsedValues.push(this.parseValue(value));
    }

    return parsedValues;
  }

  static parseValue(value: any): any {
    if (this.isFile(value)) {
      return this.parseFile(value);
    }

    return value;
  }

  static isFile(value: any): boolean {
    return (
      value !== null &&
      typeof value === "object" &&
      value.rawFile &&
      value.s3Key
    );
  }

  static parseFile(file: any): any {
    if (!this.storageBucket || !this.storageRegion) {
      console.log(`Missing storage options`);
      throw new Error("Data provider error");
    }

    return {
      bucket: this.storageBucket,
      region: this.storageRegion,
      key: file.s3Key,
    };
  }
}
