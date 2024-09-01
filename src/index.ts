export interface IConfigQueryOptions {
  fields: string[];
  filterMethods?: any;
}

class ConfigQuery {
  private readonly configs: any[] = [];
  private readonly options: IConfigQueryOptions = {
    fields: [],
    filterMethods: {},
  };

  constructor(inConfigs: any, inOptions: IConfigQueryOptions) {
    this.configs = inConfigs;
    this.options = inOptions;
  }

  private getFilterValue(field: string, filters: Record<string, string>) {
    const { filterMethods } = this.options;
    // Check if the field has an associated method
    if (filterMethods?.[field]) {
      return filterMethods[field]();
    }
    // Otherwise, return the value from the filters directly
    return filters[field];
  }

  public get(filters: Record<string, string>): any {
    const result = this.gets(filters);
    return result.length > 0 ? result[0] : null;
  }

  public gets(filters: Record<string, string>): any[] {
    return this.configs.filter(config => {
      return this.options.fields.every(field => {
        const filterValue = this.getFilterValue(field, filters);
        return filterValue === undefined || config[field] === filterValue;
      });
    });
  }

  public getValue(filters: Record<string, string>): any[] {
    const result = this.gets(filters);
    return result.length > 0 ? result[0].value : null;
  }

  public getLabelByValue(filters: Record<string, string>, value: string) {
    const result = this.getValue(filters);
    if (result) {
      const item = result.find(v => v.value === value);
      return item ? item.label : null;
    }
    return null;
  }
}


export default ConfigQuery;
