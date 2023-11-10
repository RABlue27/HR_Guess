import csv
from pybaseball import get_splits

def get_player_data(csv_file):
    player_data = {}

    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for index, row in enumerate(reader):
  
            full_name = row.get('mlb_name', '')
            bbref_id = row.get('bref_id', '')

            if bbref_id:
                player_data[full_name] = bbref_id
    return player_data

def main():
    csv_file_path = r'minesweeper/src/master.csv'
    players_dict = get_player_data(csv_file_path)
    players_dict = dict(list(players_dict.items())[:5])
    with open("stats.csv", 'w') as f:
        for full_name, bbref_id in players_dict.items():
            try:
                df = get_splits(bbref_id)

                if not df.empty:
                    df = df.reset_index(drop=True)
                    data_to_write = f'{full_name},{bbref_id}\n{df.to_csv(index=False)}\n'
                    f.write(data_to_write)
                else:
                    print(f'No data found for {full_name}: {bbref_id}')

                print(f'Successfully processed {full_name}: {bbref_id}')
            except Exception as e:
                print(f'Error processing {full_name}: {bbref_id}. {e}')

    print("Done")

if __name__ == "__main__":
    main()
