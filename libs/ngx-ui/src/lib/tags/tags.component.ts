import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'linktank-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  @Input()
  tags: string[];

  addingTag = false;
  editingTag = false;
  tagInput = '';
  editTagInput = '';
  tagBeingEdited = '';

  @Output()
  tagsChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() {
    this.tags = [];
  }

  async addTag(newTag: string) {
    if (this.tags.includes(newTag)) {
      this.toggleAddTag();
      this.tagInput = '';
    } else {
      if (newTag.includes(',')) {
        const tags = newTag.split(',');
        for (let i = 0; i < tags.length; i++) {
          this.tags.push(tags[i].trim());
        }
      } else {
        this.tags.push(newTag.trim());
      }
      this.tagsChanged.emit(this.tags);
      this.toggleAddTag();
      this.tagInput = '';
    }
  }

  toggleAddTag() {
    this.addingTag = !this.addingTag;
  }

  toggleEditTag(tag: string) {
    this.tagBeingEdited = tag;
    this.editingTag = !this.editingTag;
  }

  async editTag(oldTag: string) {
    if (this.tags.includes(oldTag)) {
      const index = this.tags.indexOf(oldTag);
      this.tags[index] = this.editTagInput;
      this.editTagInput = '';
      this.editingTag = false;
      this.tagsChanged.emit(this.tags);
    }
  }

  async deleteTag(removedTag: string) {
    if (this.tags.includes(removedTag)) {
      this.tags = this.tags.filter((tag: string) => tag !== removedTag);
      this.tagsChanged.emit(this.tags);
    }
  }
}
