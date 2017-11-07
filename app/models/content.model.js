public class ContentModel {
  public type;
  public id;
  public title;
  public src;
  public fileName;
  public data;

  /**
  * Create
  */
  public static create(content, callback) {

  }

  /**
  * Read
  */
  public static read(id, callback) {

  }

  /**
  * Update
  */
  public static update(content, callback) {

  }

  /**
  * Delete
  */
  public static delete(id, callback) {

  }

  /**
  * Constructor
  */
  public ContentModel(jsonObject) {
    this.id = jsonObject.id;
    this.type = jsonObject.type;
    this.title = jsonObject.title;
    this.src = jsonObject.src;
    this.fileName = jsonObject.fileName;
    this.data = jsonObject.data;
  }
}
