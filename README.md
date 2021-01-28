# Gsheet-chart1
Google sheets script for a weather station chart

Requires a csv file in the same folder with this format (example):
23/01/2021 20:00,987,-3,94

The fields are 1) date and time 2) pressure 3) temperature 4) humidity

The code generates a user menu with choices to 
a) load CSV (the rows from this file are APPENDED to the existing rows)
b) draw a chart with choice of time span
