library(tidyverse)

coffee <- read.csv("https://raw.githubusercontent.com/lamccart15/Coffee_Ratings/main/data/coffee_data_cleaned.csv")

country_counts <- coffee %>% count(country_of_origin)

country_counts[32, 1] <- "USA"

write.csv(country_counts, "data/country_coffee_counts.csv", row.names=FALSE)

processing_counts <- coffee %>% count(processing_method)

processing_counts[1,1] <- "Not Specified"

processing_counts <- data.frame(processing_counts)

write.csv(processing_counts, "data/processing_method_counts.csv", row.names=FALSE)