
set.seed(42)
x <- 1:30
y <- 2*x + rnorm(30, mean=0, sd=10)       
vals <- rnorm(100, mean=50, sd=12)        
cats <- c("A","B","C","D")
counts <- c(23, 17, 35, 10)               

# Basic Scatter Plot (base R)
plot(x, y,
     main = "Scatter Plot - base R",
     xlab = "X value",
     ylab = "Y value",
     pch = 19,      # point style
     cex = 1.2)     # point size
abline(lm(y ~ x), col = "blue", lwd = 2) 

# 2) Histogram (base R) 
hist(vals,
     breaks = 12,
     main = "Histogram of vals",
     xlab = "Value",
     ylab = "Frequency",
     prob = FALSE)

# 3) Simple Plot 
plot(x, y, type = "b",
     main = "Plot (points + lines)",
     xlab = "Index",
     ylab = "Measurement",
     pch = 16)

#4) Line Chart (time series style) 

months <- seq(as.Date("2025-01-01"), by = "month", length.out = 12)
sales <- round(runif(12, 100, 300))
plot(months, sales, type = "o", 
     main = "Monthly Sales",
     xlab = "Month",
     ylab = "Sales",
     xaxt = "n")
axis.Date(1, at = months, format = "%b")  

#5) Bar Chart (vertical) 
barplot(counts,
        names.arg = cats,
        main = "Counts by Category",
        xlab = "Category",
        ylab = "Count",
        ylim = c(0, max(counts) + 10))

#  6) Pie Chart 
pie(counts,
    labels = paste(cats, counts, sep=": "),
    main = "Pie Chart - Category share")

library(ggplot2)

# ggplot scatter + regression
df1 <- data.frame(x = x, y = y)
ggplot(df1, aes(x = x, y = y)) +
  geom_point() +
  geom_smooth(method = "lm", se = TRUE) +
  ggtitle("Scatter with regression (ggplot2)")

# ggplot histogram
df2 <- data.frame(vals = vals)
ggplot(df2, aes(x = vals)) +
  geom_histogram(bins = 12, fill = "lightblue", color = "black") +
  ggtitle("Histogram (ggplot2)")

# ggplot line chart
df3 <- data.frame(month = months, sales = sales)
ggplot(df3, aes(x = month, y = sales)) +
  geom_line() + geom_point() +
  scale_x_date(date_labels = "%b") +
  ggtitle("Monthly Sales (ggplot2)")

# ggplot bar
df4 <- data.frame(cat = cats, count = counts)
ggplot(df4, aes(x = cat, y = count)) +
  geom_col() +
  ggtitle("Bar chart (ggplot2)")

# ggplot pie (using coord_polar)
ggplot(df4, aes(x = "", y = count, fill = cat)) +
  geom_col(width = 1) +
  coord_polar(theta = "y") +
  theme_void() +
  ggtitle("Pie chart (ggplot2)")
