### This document is responsible for linear regression on regular season data ###
### To make prediction on the result of playoff games ###
### Slope of the regression line can indicate the potential for long-run battle ###

A = "OKC"  #team A
B = "UTA"  #team B

#d = read.csv("6.play_by_play_2017_18.csv")
library(tidyverse)

d1 = d[d$team==A,]
d2 = d[d$team==B,]

#clean the original date$game_ID
g = d$game_id
g = str_remove(g,'="00')
g = str_remove(g,'\"')
g = as.numeric(g)
d$game_id = g

g1 = unique(d1$game_id)
g2 = unique(d2$game_id)
g1 = str_remove(g1,'="00')
g1 = str_remove(g1,'\"')
g1 = as.numeric(g1)
g2 = str_remove(g2,'="00')
g2 = str_remove(g2,'\"')
g2 = as.numeric(g2)

idx = g1[which(g1 %in% g2)]
(idx = idx[idx<30000000]) #choose the regular season only
n = length(idx)

for (i in 1:n){
  id = which(d$game_id==idx[i])
  dat = d[id,]
  assign(paste('game',i,sep=""),dat)
  away_player = as.character(unique(dat$a1)[-1])
  idd = which(dat$player==away_player[1])
  datt = dat[idd,]
  away = as.character(datt$team[1])
  home = A
  if(A==away){
    home = B
    assign(paste(A,'_score',i,sep=""),dat$away_score)
    assign(paste(B,'_score',i,sep=""),dat$home_score)
  }
  else{
    assign(paste(A,'_score',i,sep=""),dat$home_score)
    assign(paste(B,'_score',i,sep=""),dat$away_score)
  }
  assign(paste('time',i,sep=""),(dat$period-1)*720+
           toSeconds(as.character(dat$elapsed)))
  cat('game',i,"away:",away, "home:",home,'\n')
}


fit = lm(c(OKC_score1,OKC_score2,OKC_score3)~c(time1,time2,time3))
plot(c(OKC_score1,OKC_score2,OKC_score3)~c(time1,time2,time3),ylab="Cumulative Score",xlab="Time Elapsed",cex=0.2,col="palevioletred1")
abline(fit,col="darkturquoise",lwd=3)
fit2 = lm(c(UTA_score1,UTA_score2,UTA_score3)~c(time1,time2,time3))
points(c(UTA_score1,UTA_score2,UTA_score3)~c(time1,time2,time3),cex=0.2,col="paleturquoise2")
abline(fit2,col="deeppink",lwd=2)

x=2880
fit = lm(c(OKC_score1,OKC_score2,OKC_score3,OKC_score4)~c(time1,time2,time3,time4))
plot(c(OKC_score1,OKC_score2,OKC_score3,OKC_score4)~c(time1,time2,time3,time4),
     ylab="Cumulative Score",xlab="Time Elapsed",cex=0.2,
     main = "Regression Line of Regular Season Performance")
predict(fit,newdata=data.frame(x=c(2880)))
abline(fit,col="blue")
pred = as.numeric(fit$coefficients[1]+x*fit$coefficients[2])
points(x,pred,col="blue")

fit2 = lm(c(UTA_score1,UTA_score2,UTA_score3,UTA_score4)~c(time1,time2,time3,time4))
points(c(UTA_score1,UTA_score2,UTA_score3,UTA_score4)~c(time1,time2,time3,time4),cex=0.2,col="green")
abline(fit2,col="red")
pred = as.numeric(fit2$coefficients[1]+x*fit2$coefficients[2])
points(x,pred,col="red")

#ggplot version
# df = data.frame(score_OKC = c(OKC_score1,OKC_score2,OKC_score3,OKC_score4),
#                 score_UTA = c(UTA_score1,UTA_score2,UTA_score3,UTA_score4),
#                 time = c(time1,time2,time3,time4))
# p <- ggplot() + 
#   geom_point(data=df,aes(x=time,y=score_OKC,color="red"),size=0.5) + 
#   geom_point(data=df,aes(x=time,y=score_UTA,color="blue"),size=0.5) +
#   geom_abline(intercept=fit$coefficients[1],slope = fit$coefficients[2],color="red",size=0.5)+
#   geom_abline(intercept=fit2$coefficients[1],slope = fit2$coefficients[2],color="blue",size=0.5)+
#   ylab("Cumulative Scores")+
#   xlab("Time elapsed")
# p

### injuery check
idx = g1[which(g1 %in% g2)]
#(idx = idx[idx<30000000])
n = length(idx)
for (i in 1:n){
  id = which(d$game_id==idx[i])
  dat = d[id,]
  assign(paste('game',i,sep=""),dat)
  away_player = unique(c(as.character(unique(dat$a1)),
                         as.character(unique(dat$a2)),
                         as.character(unique(dat$a3)),
                         as.character(unique(dat$a4)),  
                         as.character(unique(dat$a5))))
  home_player = unique(c(as.character(unique(dat$h1)),
                         as.character(unique(dat$h2)),
                         as.character(unique(dat$h3)),
                         as.character(unique(dat$h4)),  
                         as.character(unique(dat$h5))))
  idd = which(dat$player==away_player[1])
  iddd = which(dat$player==home_player[1])
  datt = dat[idd,]
  away = as.character(datt$team[1])
  dattt = dat[iddd,]
  home = as.character(dattt$team[1])
  
  cat('game',i,"away:",away,"<",sort(away_player),'\n') 
  cat('game',i,"home:",home,"<",sort(home_player),'\n')
}