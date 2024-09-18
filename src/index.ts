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
      filters[key] =
        typeof dynamicFilters[key] === 'string' ? dynamicFilters[key] : dynamicFilters[key]();
    }
    return filters;
  }

  constructor(inConfigs: any, inOptions?: IConfigQueryOptions) {
    if (!Array.isArray(inConfigs)) console.error('inConfigs must be an Array');
    this.configs = inConfigs || [];
    this.options = inOptions;
  }

  public select(filters: Record<string, string>): any[] {
    const allFilters = { ...this.calculatedFilters, ...filters };
    return this.configs.filter((config) => {
      return Object.entries(allFilters).every(([key, value]) => {
        if (config[key] == undefined) return true;
        return config[key] === value;
      });
    });
  }

  public find(filters: Record<string, string>): any {
    const selected = this.select(filters);
    if (selected.length === 0) return null;
    return selected[0] || null;
  }

  public value(filters: Record<string, string>): any {
    const selected = this.find(filters);
    return selected?.value || null;
  }

  // ---- Static Methods ----
  public static select(configs: any[], filters: Record<string, string>): any[] {
    return new ConfigQuery(configs).select(filters);
  }

  public static find(configs: any[], filters: Record<string, string>): any {
    return new ConfigQuery(configs).find(filters);
  }
  public static value(configs: any[], filters: Record<string, string>): any {
    return new ConfigQuery(configs).value(filters);
  }
}

export default ConfigQuery;
