# Find Clayton Kershaw's player id
from pybaseball import  playerid_lookup
from pybaseball import  statcast_pitcher
playerid_lookup('kershaw', 'clayton')

# His MLBAM ID is 477132, so we feed that as the player_id argument to the following function 
kershaw_stats = statcast_pitcher('2017-06-01', '2017-07-01', 477132)
kershaw_stats.groupby("pitch_type").release_speed.agg("mean")
