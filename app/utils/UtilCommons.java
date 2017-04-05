package utils;

import java.util.Random;

/**
 * Created by siddhujz on 4/4/2017.
 */
public class UtilCommons {
  public static String generatePassword() throws Exception {
    try {
      char[] charArray = "abcdefghijklmnopqrstuvwxyz".toCharArray();
      StringBuilder stringBuilder = new StringBuilder();
      Random random = new Random();
      for (int i = 0; i < 10; i++) {
        char c = charArray[random.nextInt(charArray.length)];
        stringBuilder.append(c);
      }
      String randomPassword = stringBuilder.toString();
      return randomPassword;
    } catch (Exception e) {
      throw new Exception("Password generation failed!");
    }
  }
}
