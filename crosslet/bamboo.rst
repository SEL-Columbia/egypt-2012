curl -X POST -d "name=polling_irregularity&formula=b_e in [\"2\"] or b_f in [\"2\"] or b_g in [\"2\"] or b_h in [\"2\"] or b_j in [\"2\"] or b_k in [\"2\"] http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc

curl -X POST -d "name=polls_open&formula=ratio(a_a in [\"1\"],1)&group=governorate" http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc
curl -X POST -d "name=ballots_counted&formula=ratio(b_e in [\"1\"],1)&group=governorate" http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc
curl -X POST -d "name=ballot_boxes_empty_before_voting&formula=ratio(b_g in [\"1\"],1)&group=governorate" http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc
curl -X POST -d "name=ballot_boxes_closed_with_HEC_seal&formula=ratio(b_h in [\"1\"],1)&group=governorate" http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc
curl -X POST -d "name=polling_center_handycap_accessible&formula=ratio(b_j in [\"1\"],1)&group=governorate" http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc
curl -X POST -d "name=polling_centers_have_indelible_ink&formula=ratio(b_k in [\"1\"],1)&group=governorate" http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc
curl -X POST -d "name=r_polling_irregularity&formula=ratio(polling_irregularity,1)&group=governorate" http://bamboo.io/calculations/099994a9504e492f878d7e691cdf2afc