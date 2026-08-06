import mongoose, { Model, PopulateOptions, Types} from "mongoose";

export default abstract class  BaseRepository <T> {
    constructor(protected readonly model:Model<T>) {}
    creatDocument(data:Partial<T>): Promise<T> 
    {
        return this.model.create(data)
    }

 findOneDocument(
    filters:mongoose.FilterQuery<T>,
    select = {}
  ): Promise<T | null> {
    return this.model.findOne(filters).select(select);
  }

  findDocumentById(id: Types.ObjectId, options?: mongoose.QueryOptions): Promise<T | null> {
    const {populate} = options || {};
    const query= this.model.findById(id) 
     if (populate)
      query.populate(populate as PopulateOptions);
    return query;
  }

  findDocuments(
    filters: mongoose.FilterQuery<T>,
    options?: mongoose.QueryOptions
  ): Promise<T[]> {

    const { limit, skip, populate, select, ...otherOptions } = options || {};
    const query = this.model.find(filters, otherOptions);

    if (limit !== undefined && skip !== undefined) {
      return query.limit(limit).skip(skip);
    }

    if (populate)
      query.populate(populate as PopulateOptions);

    if (select)
      query.select(select);

    return query;
  }

  updateWithFindById({
    id,
    data,
    options,
  }: {
    id: Types.ObjectId,
    data: mongoose.UpdateQuery<T>,
    options?: mongoose.QueryOptions
  }) {
    return this.model.findByIdAndUpdate(
      id,
      data,
      { ...options, runValidators: true }
    );
  }

  deleteWithFindOne({
    filters,
  }: {
    filters: mongoose.FilterQuery<T>,
  }): Promise<T | null> {
    return this.model.findOneAndDelete(filters);
  }

  deleteWithFindById(_id: Types.ObjectId) {
    const query = this.model.findByIdAndDelete(_id);
    return query;
  }
}