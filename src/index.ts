export interface IConfigQueryOptions {
  dynamicFilters?: Record<string, () => any> | Record<string, any>;
}

class ConfigQuery {
  private readonly configs: any[] = [];
  private readonly options?: IConfigQueryOptions = { dynamicFilters: {} };

  get calculatedFilters() {
    const filters = {};
    const { dynamicFilters } = this.options || {};
    for (const key in dynamicFilters) {
      filters[key] = typeof dynamicFilters[key] === 'string' ? dynamicFilters[key] : dynamicFilters[key];
    }
    return filters;
  }

  constructor(inConfigs: any, inOptions?: IConfigQueryOptions) {
    if (!Array.isArray(inConfigs)) throw new Error('inConfigs must be an Array');
    this.configs = inConfigs;
    this.options = inOptions;
  }

  public gets(filters: Record<string, string>): any[] {
    const allFilters = { ...this.calculatedFilters, ...filters };
    return this.configs.filter(config => {
      return Object.entries(allFilters).every(([key, value]) => {
        return config[key] === value;
      });
    });
  }

  public get(filters: Record<string, string>): any {
    const selected = this.gets(filters);
    if (selected.length === 0) return null;
    return selected[0] || null;
  }

  public value(filters: Record<string, string>): any {
    const selected = this.get(filters);
    return selected?.value || null;
  }
}

export default ConfigQuery;
