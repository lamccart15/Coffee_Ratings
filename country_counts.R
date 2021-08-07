library(tidyverse)

coffee <- read.csv("https://raw.githubusercontent.com/lamccart15/Coffee_Ratings/main/data/coffee_data_cleaned.csv")

country_counts <- coffee %>% count(country_of_origin)

write.csv(country_counts, "data/country_coffee_counts.csv", row.names=FALSE)