export type Category = {
  label: string;
  is_completed: string;
};

export type MplanSchema = {
  id: string;
  moving_date: Date;
  old_address: string;
  new_address: string;
  selected_categories: Category[];
};
